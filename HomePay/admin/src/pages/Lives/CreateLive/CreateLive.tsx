/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback, useEffect } from "react";
import Breadcrumb from "components/Breadcrumb";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useSelector } from "react-redux";
import { RootState } from "store/root-reducer";
import { UserState } from "store/slices/user";
import { toast } from "react-toastify";
import { Api } from "services/api";
import Redirect from "components/Redirect";
import SubmitButton from "components/SubmitButton";
import VimeoPlayer from "components/VimeoPlayer";

interface FormData {
  title: string;
  course?: string;
  topic?: string;
  description?: string;
  school?: string;
  estimation: number | undefined;
}

const CreateLive: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [live, setLive] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const userData = useSelector<RootState, UserState>((state) => state.user);
  const validationSchema = Yup.object().shape<FormData>({
    title: Yup.string().max(50, "Devo conter no máximo 50 caracteres").required("Digite um título válido"),
    course: Yup.string().required("Escolha um curso"),
    estimation: Yup.number().required("Digite uma estimativa de duração da live"),
  });
  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    Api.listCourses(undefined, { author: userData.userId }).then((res) => setCourses(res.data.response));
  }, [userData.userId]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      const selectedCourse = courses.find((s) => s._id === data.course);
      try {
        setSubmitting(true);
        const res = await Api.createLiveEvent({
          courseId: data.course,
          description: data.description,
          estimatedDurationInMinutes: data.estimation,
          name: data.title,
          levelId: selectedCourse.level._id,
          subjectId: selectedCourse.subject._id,
        });
        setLive(res.data.response);
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        toast.error(`Ops! Alguma coisa aconteceu de errado`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    },
    [courses],
  );

  const handleStartLive = useCallback(async (id: string) => {
    try {
      setSubmitting(true);
      await Api.beginEvent(id);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      toast.error(`Ops! Alguma coisa aconteceu de errado`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, []);

  return (
    <>
      <div className="content-body w-100 h-100">
        <Breadcrumb
          title="Nova transmissão"
          description="Crie uma nova transmissão ao vivo"
          breadcrumb={[
            { text: "Home", link: "/" },
            { text: "Lives", link: "/lives" },
            { text: "Nova transmissão", link: "/lives/criar" },
          ]}
        />
        <div className="row tx-14 mb-5">
          <div className="col-sm-5 mg-t-20 mg-sm-t-25">
            <div className="mg-lg-r-50 mg-xl-r-60 p-4" style={{ backgroundColor: "white" }}>
              {!live?.streamKey ? (
                <form className="pd-t-20 wd-100p" onSubmit={handleSubmit(onSubmit)}>
                  <h4 className="tx-color-01 mg-b-5">Criar transmissão ao vivo</h4>
                  <p className="text-gray tx-lato mt-3 mg-b-40">Cadastre uma nova transmissão ao vivo para interagir com seus alunos de maneira rápida e dinâmica!</p>
                  <div className="form-group">
                    <label>Título da live</label>
                    <input name="title" type="text" className="form-control" placeholder="Digite o nome da aula" ref={register} />
                    {errors.title && <small className="form-error tx-danger">Informe a descrição do evento</small>}
                  </div>
                  <div className="form-group">
                    <label>Descrição</label>
                    <input name="description" type="text" className="form-control" placeholder="Sobre o que sua live será?" ref={register} />
                    {errors.description && <small className="form-error tx-danger">Informe a descrição do evento</small>}
                  </div>
                  <div className="form-group">
                    <label>Curso</label>
                    <select name="course" className="form-control select2-no-search" ref={register}>
                      <option value="" label="Selecione um curso" />
                      {courses.map((item: any) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.course && <small className="form-error tx-danger">Informe a descrição do evento</small>}
                  </div>
                  <div className="form-group">
                    <label>Escola</label>
                    <select name="school" className="form-control select2-no-search" ref={register}>
                      <option value="" label="Selecione uma escola" />
                      <option value="null" label="Funcionalidade ainda não implementada" />
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Estimativa de duração (minutos)</label>
                    <input name="estimation" value={undefined} type="number" className="form-control" placeholder="Estimativa, em minutos, de duração da live" ref={register} />
                    {errors.estimation && <small className="form-error tx-danger">Informe a descrição do evento</small>}
                  </div>
                  <div className="mt-4">
                    <SubmitButton wait={submitting} className="btn btn-brand-02 btn-block" text="Criar" />
                    {submitting && <span className="form-error">Esse processo pode levar até um minuto para ser concluído</span>}
                  </div>
                </form>
              ) : (
                <div className="pd-t-20 wd-100p">
                  {!isPlaying ? (
                    <>
                      <h4 className="tx-color-01 mg-b-5">Quase lá!</h4>
                      <p className="text-gray tx-lato mt-3 mg-b-40 text-justify">
                        Copie e cole a chave de transmissão no seu OBS studio. Caso tenho dúvidas, consulte o tutorial clicando{" "}
                        <a href="/" target="blank">
                          aqui
                        </a>
                        . Lembre-se que esta live será gravada e ficará disponível para seus alunos no futuro
                      </p>
                      <div className="form-group">
                        <label>Servidor RTMP</label>
                        <input name="title" type="text" className="form-control" value="rtmp://rtmp-global.cloud.vimeo.com/live" disabled />
                      </div>
                      <div className="form-group">
                        <label>Chave de transmissão</label>
                        <input name="title" type="text" className="form-control" value={live?.streamKey} disabled />
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className="tx-color-01 mg-b-5">Tudo pronto!</h4>
                      <label>Clique para entrar ao vivo</label>
                      <Redirect
                        disabled={isPlaying}
                        to={`/lives/${live?._id}`}
                        callback={() => handleStartLive(live._id)}
                        wait={submitting}
                        text="Entrar ao vivo"
                        className="btn btn-success mb-3 btn-block"
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="col-sm-7 mg-t-20 mg-sm-t-25">
            {live?.streamKey ? (
              <VimeoPlayer
                title="vimeo-player"
                src={`https://player.vimeo.com/video/${live.eventId}`}
                width={640}
                height={360}
                frameBorder="0"
                allowFullScreen
                onStart={() => setIsPlaying(true)}
              />
            ) : (
              <div>
                Você pode fazer o download do programa de transmissão clicando <a href="https://obsproject.com/download">aqui</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLive;

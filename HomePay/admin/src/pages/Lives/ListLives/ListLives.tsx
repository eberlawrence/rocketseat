/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from "react";
import Breadcrumb from "components/Breadcrumb";
import ExpandableCard from "pages/Lives/components/ExpandableCard";
import Redirect from "components/Redirect";
import Button from "components/Button";
import { Api } from "services/api";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import SubmitButton from "components/SubmitButton";

interface FormData {
  id: string;
  title: string;
  description: string;
  estimation: string;
}

const ListLives: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [lives, setLives] = useState<any[]>([]);
  const { register, errors, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    Api.listLiveEvent()
      .then((res) => {
        setLives(res.data.response);
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao buscar os itens");
      });
  }, []);

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      setSubmitting(true);
      await Api.updateEvent(data.id, {
        description: data.description,
        estimateDurationInMinutes: data.estimation,
        name: data.title,
      });
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      toast.error(`Ops! Alguma coisa aconteceu de errado`);
    }
  }, []);

  const handleEndEvent = useCallback(
    async (id: string) => {
      try {
        setSubmitting(true);
        await Api.endEvent(id);
        const _ = lives;
        _.find((x) => x._id === id).isLiveNow = false;
        setLives(_);
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
        toast.error(`Ops! Alguma coisa aconteceu de errado`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    },
    [lives],
  );

  return (
    <>
      <div className="content-body w-100 h-100 ">
        <Breadcrumb
          title="Lista de transmissões"
          breadcrumb={[
            { text: "Início", link: "/" },
            { text: "Transmissões", link: "/lives" },
            { text: "Lista de Transmissões", link: "/lives/listar" },
          ]}
        />
        <div className="container">
          {lives &&
            lives.map((item) => (
              <ExpandableCard key={item._id} icon={item.subject.icon} level={item.level.name} subject={item.subject.name} name={item.name} isLive={item.isLiveNow}>
                {item.isLiveNow && (
                  <div className="mb-3">
                    <Redirect to={`/lives/${item._id}`} wait={submitting} text="Entrar na sala" className="btn btn-success mr-2" />
                    <Button callback={() => handleEndEvent(item._id)} wait={submitting} text="Encerrar transmissão" className="btn btn-warning " />
                  </div>
                )}
                <form className="form-fieldset" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>Título da live</label>
                    <input name="title" type="text" className="form-control" placeholder="Digite o nome da aula" ref={register({ required: true })} />
                    {errors.title && <small className="form-error tx-danger">Informe o título</small>}
                  </div>
                  <div className="form-group">
                    <label>Descrição</label>
                    <input name="description" type="text" className="form-control" placeholder="Sobre o que será sua live?" ref={register({ required: true })} />
                    {errors.description && <small className="form-error tx-danger">Informe a descrição do evento</small>}
                  </div>
                  <div className="form-group">
                    <label>Estimativa de duração (minutos)</label>
                    <input name="estimation" type="number" className="form-control" placeholder="Estimativa, em minutos, de duração da live" ref={register({ required: true })} />
                    {errors.estimation && <small className="form-error tx-danger">Informe a duração estimada do evento</small>}
                  </div>
                  <div className="mt-4">
                    <SubmitButton wait={submitting} className="btn btn-brand-02 btn-block" text="Editar" />
                  </div>
                  <div className="form-group pt-5 d-flex justify-content-center">
                    <iframe
                      title={uuid()}
                      src={`https://player.vimeo.com/video/${item.eventId}`}
                      width="640"
                      height="360"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  </div>
                </form>
              </ExpandableCard>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListLives;

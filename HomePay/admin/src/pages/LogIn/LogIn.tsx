import React, { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import SubmitButton from "components/SubmitButton";
import { useForm } from "react-hook-form";
import { useAuth } from "hooks/auth";

interface FormData {
  username: string;
  password: string;
}

const LogIn: React.FC = () => {
  const [showStep, setShowStep] = useState<string>("login");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { register, errors, handleSubmit } = useForm<FormData>();
  const [loginError, setLoginError] = useState<string>("");
  const history = useHistory();
  const { signIn } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      setLoginError("");
      setSubmitting(false);
      await signIn({
        username: data.username,
        password: data.password,
      });
      history.push("/");
    } catch (error) {
      setLoginError(error.data?.message ?? "Falha ao realizar login");
    }
  };

  const changeShowStep = useCallback((newShow: string) => {
    setShowStep(newShow);
  }, []);

  return (
    <>
      <div className="h-100">
        <div className="pos-absolute h-100 w-100 d-none d-md-block overflow-hidden" style={{ backgroundImage: "url('assets/img/bg.jpg')", backgroundSize: "cover" }}>
          <div className="row h-100">
            <div className="d-flex m-4 flex-column">
              <div className="mt-auto p-2 ml-2 bg-gray-9">
                <h3 className="mb-0 text-white tx-lato"> Bem-vindo(a) ao Aulé</h3>
                <small className="text-white tx-lato">Uma nova forma de ensino e aprendizado de maneira descomplicada, atualizada e interativa!</small>
              </div>
            </div>
          </div>
        </div>

        <div className="sign-wrapper pos-fixed t-20 r-20 col-sm-12 shadow-sm b-20 float-right">
          <div className="d-flex h-100 m-4 flex-column">
            <div className="wd-100p">
              <img src="assets/img/logo-aule.png" style={{ maxHeight: 100 }} alt="logo" />
              <hr />
            </div>
            {showStep === "login" && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="wd-100p">
                  <p className="text-gray tx-lato mt-3 mg-b-40">Bem vindo novamente! Faça o login para continuar.</p>
                  {submitting ? (
                    <>
                      <div className="spinner-border spinner-border-sm" role="status" />
                      <p>
                        <small>Entrando...</small>
                      </p>
                    </>
                  ) : (
                    <>
                      {loginError && (
                        <div className="alert alert-warning d-flex align-items-center" role="alert">
                          <i className="fas fa-exclamation-circle mg-r-10" />
                          {loginError}
                        </div>
                      )}
                      <div className="form-group">
                        <label>Usuário (Username)</label>
                        <input name="username" type="text" className="form-control" placeholder="Username para acesso" ref={register({ required: true })} />
                        {errors.username && <small className="tx-danger">Informe seu login</small>}
                      </div>
                      <div className="form-group">
                        <div className="d-flex justify-content-between mg-b-5">
                          <label htmlFor="Password" className="mg-b-0-f">
                            Senha
                          </label>
                        </div>
                        <input name="password" type="password" className="form-control" placeholder="Digite sua senha" ref={register({ required: true })} />
                        {errors.password && <small className="tx-danger">Informe a senha</small>}
                      </div>
                      <div className="animated bounce">
                        <SubmitButton wait={false} className="btn btn-brand-02 btn-block" text="Entrar" />
                      </div>
                      <Link to="#" className="tx-13" onClick={() => changeShowStep("forgot-password")}>
                        Esqueceu sua senha?
                      </Link>
                    </>
                  )}
                </div>
              </form>
            )}
            {showStep === "forgot-password" && (
              <div className="wd-100p">
                <h3 className="mb-0 text-gray tx-lato mg-b-5">Esqueci minha senha</h3>
                <p className="text-gray tx-lato mg-b-40">Para receber o lembre de senha, digite seu Username.</p>
                <div className="form-group">
                  <label>Usuário (Username)</label>
                  <input type="user" className="form-control" />
                </div>
                <div className="animated bounce">
                  <button className="btn btn-brand-02 btn-block">Enviar e-mail</button>
                </div>
                <Link to="/" className="tx-13" onClick={() => changeShowStep("login")}>
                  Voltar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;

import React from "react";
import Breadcrumb from "components/Breadcrumb";
import { Link } from "react-router-dom";
import Icon from "components/Icon";

const Lives: React.FC = () => {
  return (
    <>
      <div className="content-body w-100 h-100">
        <Breadcrumb
          title="Transmissões ao vivo"
          description="Gerencie as suas transmissões ao vivo"
          breadcrumb={[
            { text: "Início", link: "/" },
            { text: "Transmissões", link: "/lives" },
          ]}
        />
        <div className="container">
          <div className="row tx-14">
            <div className="col-sm-6 mg-t-20 mg-sm-t-25">
              <div className="bg-white bd pd-20 pd-lg-30 ht-sm-300 d-flex flex-column justify-content-end">
                <div className="mg-b-25">{Icon("layers")}</div>
                <h5 className="tx-inverse mg-b-20">Gerenciar suas aulas ao vivo</h5>
                <p className="mg-b-20">Gerencie as informações das suas aulas já transmitidas</p>
                <Link to="/lives/listar" className="tx-medium float-right">
                  Ver minhas aulas gravadas
                </Link>
              </div>
            </div>
            <div className="col-sm-6 mg-t-20 mg-sm-t-25">
              <div className="bg-white bd pd-20 pd-lg-30 ht-sm-300 d-flex flex-column justify-content-end">
                <div className="mg-b-25">{Icon("edit-3")}</div>
                <h5 className="tx-inverse mg-b-20">Novo</h5>
                <p className="mg-b-20">Vamos entrar ao vivo? Então começe aqui cadastrando as informações.</p>
                <Link to="/lives/criar" className="tx-medium">
                  Iniciar uma live <i className="icon ion-md-arrow-forward mg-l-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lives;

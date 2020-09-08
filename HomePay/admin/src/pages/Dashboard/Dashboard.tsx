import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/root-reducer";
import { UserState } from "store/slices/user";

const Dashboard: React.FC = () => {
  const userData = useSelector<RootState, UserState>((state) => state.user);
  return (
    <>
      <>
        <div className="content content-fixed content-auth-alt" style={{ flex: 1 }}>
          <div className="container ht-100p">
            <div className="ht-100p d-flex flex-column align-items-center justify-content-center">
              <h4 className="tx-20 tx-sm-24">Olá, {userData.data.socialName}!</h4>
              <div className="card card-body w-100 py-2">
                <div className="d-md-flex align-items-center justify-content-between">
                  <div className="media align-sm-items-center">
                    <div className="crypto-icon bg-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-bell"
                      >
                        <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
                      </svg>
                    </div>

                    <div className="media-body mg-l-15">
                      <h6 className="tx-12 tx-lg-14 tx-semibold tx-uppercase tx-spacing-1 mg-b-0">Matemática</h6>

                      <small>14/08/2020 as 16:30hs</small>
                      <div className="d-flex align-items-baseline">
                        <h2 className="tx-20 tx-lg-28 tx-normal tx-rubik tx-spacing--2 lh-2 mg-b-0">Como somar 2 número inteiros</h2>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-sm-row mg-t-20 mg-md-t-0">
                    <a href="/salas/espera" className="btn btn-sm btn-white btn-uppercase pd-x-15 mg-t-5 mg-sm-t-0  mg-sm-l-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-eye mg-r-5"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Entrar
                    </a>
                  </div>
                </div>
              </div>
              <div className="wd-700 wd-sm-700 mg-b-30">
                <img src="assets/img/undraw_youtube_tutorial_2gn3.png" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Dashboard;

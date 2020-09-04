import React, { useCallback } from "react";
import { useAuth } from "hooks/auth";
import { Link } from "react-router-dom";
import { useAppDispatch } from "store";
import { clearUserData, UserState } from "store/slices/user";
import { useSelector } from "react-redux";
import { RootState } from "store/root-reducer";

import Icon from "components/Icon";

// Esse componente usa redux para controlar o estado do menu (aberto/fechado) e os dados do usário logado
// mas utilizado o hook `useAuth` para controlar ações de logar/sair da aplicação (AuthContext)
const Sidebar: React.FC = () => {
  const { data: userData } = useSelector<RootState, UserState>((state) => state.user);

  const dispatch = useAppDispatch();
  const { signOut } = useAuth();

  const handleLogout = useCallback(() => {
    dispatch(clearUserData());
    signOut();
  }, [dispatch, signOut]);

  return (
    <aside className="aside aside-fixed">
      <div className="aside-header">
        <a href="." className="aside-logo">
          Aulé
        </a>
      </div>
      <div className="aside-body">
        <div className="aside-loggedin">
          <div className="d-flex align-items-center justify-content-start">
            <a href="/" className="avatar">
              <img src={userData.profilePicture} className="rounded-circle" alt="" />
            </a>
            <div className="aside-alert-link">
              <a href="/" className="new" data-toggle="tooltip" title="" data-original-title="You have 2 unread messages">
                {Icon("message-square", 24, "")}
              </a>
              <a href="/" className="new" data-toggle="tooltip" title="" data-original-title="You have 4 new notifications">
                {Icon("bell", 24, "")}
              </a>
              <Link to="#" onClick={() => handleLogout()} title="Sair">
                {Icon("log-out", 24, "")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

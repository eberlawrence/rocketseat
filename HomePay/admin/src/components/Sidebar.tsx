import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import Icon from "components/Icon";
import { useAuth } from "hooks/auth";
import { useAppDispatch } from "store";
import { RootState } from "store/root-reducer";
import { clearUserData, UserState } from "store/slices/user";
import { MenuState, setIsOpen } from "store/slices/menu";
import { mapEnum } from "utils/enum";
import Menu, { ItemType } from "services/menu";

// Esse componente usa redux para controlar o estado do menu (aberto/fechado) e os dados do usário logado
// mas utilizado o hook `useAuth` para controlar ações de logar/sair da aplicação (AuthContext)
const Sidebar: React.FC = () => {
  const { data: userData } = useSelector<RootState, UserState>((state) => state.user);
  const { isOpen: isMenuOpen } = useSelector<RootState, MenuState>((state) => state.menu);

  const dispatch = useAppDispatch();
  const { signOut } = useAuth();
  const menu = new Menu();

  const handleLogout = useCallback(() => {
    dispatch(clearUserData());
    signOut();
  }, [dispatch, signOut]);

  const toggleMenu = (newMinimize: boolean) => {
    if (newMinimize === true) {
      if (window.innerWidth < 1200) {
        document.body.classList.add("show-aside");
      }
    } else if (window.innerWidth < 1200) {
      document.body.classList.remove("show-aside");
    }
    dispatch(setIsOpen(newMinimize));
  };

  return (
    <aside className={`aside aside-fixed ${!isMenuOpen && window.innerWidth >= 1200 && "minimize"}`}>
      <div className="aside-header">
        <a href="." className="aside-logo">
          Aulé
        </a>
        <Link to="#" className="aside-menu-link" onClick={() => toggleMenu(!isMenuOpen)}>
          {Icon("menu", 24, "")}
          {Icon("x", 24, "")}
        </Link>
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
          <div className="aside-loggedin-user">
            <a href="#loggedinMenu" className="d-flex align-items-center justify-content-between mg-b-2" data-toggle="collapse">
              <h6 className="tx-semibold mg-b-0">{userData.socialName ?? userData.fullName}</h6>
              {/* <i data-feather="chevron-down" /> */}
              {Icon("chevron-down", 24, "")}
            </a>
            {userData.userType !== undefined && <p className="tx-color-03 tx-12 mg-b-0">{mapEnum(userData.userType)}</p>}
          </div>
          <div className="collapse" id="loggedinMenu">
            <ul className="nav nav-aside mg-b-0">
              <li className="nav-item">
                <Link to="/perfil/meus-dados" className="nav-link">
                  {Icon("user", 24, "")}
                  <span>Editar perfil</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/perfil/configuracoes" className="nav-link">
                  {Icon("settings", 24, "")}
                  <span>Configurações</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" onClick={() => handleLogout()} className="nav-link">
                  {Icon("log-out", 24, "")}
                  <span>Sair</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <ul className="nav nav-aside mg-t-25">
          {menu && (
            <>
              {menu.GetMenu().map((item) => {
                if (item.itemType === ItemType.Topic) {
                  return item.route ? (
                    <li key={uuid()} className={`nav-item ${window.location.pathname === `${item.route}` && "active"}`}>
                      <Link to={`${item.route}`} className="nav-link">
                        {item.htmlIco !== null && item.htmlIco}
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ) : (
                    <li key={uuid()} className="nav-label mg-t-25">
                      {item.name}
                    </li>
                  );
                }
                return (
                  <li key={uuid()} className={`nav-item ${window.location.pathname === `${item.route}` && "active"}`}>
                    <Link to={`${item.route}`} className="nav-link">
                      {item.htmlIco !== null && item.htmlIco}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

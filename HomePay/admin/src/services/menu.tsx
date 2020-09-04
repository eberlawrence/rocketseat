// Esse serviço controla os itens que serão exibidos e a estrutura do menu lateral da aplicação

/* eslint-disable lines-between-class-members */
import { IsSVG } from "components/Icon";

export enum ItemType {
  Item,
  Topic,
}

interface IItemMenu {
  itemType?: ItemType;
  name?: string;
  route?: string;
  rule?: string;
  htmlIco?: JSX.Element;
  subMenu?: IItemMenu;
}

class ItemMenu implements IItemMenu {
  itemType?: ItemType | undefined;
  name?: string | undefined;
  route?: string | undefined;
  rule?: string | undefined;
  htmlIco?: JSX.Element | undefined;
  subMenu?: IItemMenu | undefined;

  public constructor(fields?: { name: string; itemType?: ItemType; route?: string; rule?: string; htmlIco?: JSX.Element; subMenu?: IItemMenu }) {
    if (fields) Object.assign(this, fields);
  }
}

export default class Menu {
  GetMenu(): Array<ItemMenu> {
    const menu = Array<ItemMenu>();
    menu.push(new ItemMenu({ itemType: ItemType.Topic, name: "Bem vindo", route: "/bem-vindo", htmlIco: IsSVG("coffee") }));

    menu.push(new ItemMenu({ itemType: ItemType.Topic, name: "Dashboard" }));
    menu.push(new ItemMenu({ name: "Aulas", route: "/aulas", htmlIco: IsSVG("book-open") }));
    menu.push(new ItemMenu({ name: "Alunos", route: "/alunos", htmlIco: IsSVG("users") }));
    menu.push(new ItemMenu({ name: "Cursos", route: "/cursos", htmlIco: IsSVG("book") }));
    menu.push(new ItemMenu({ name: "Escolas", route: "/escolas", htmlIco: IsSVG("award") }));

    menu.push(new ItemMenu({ itemType: ItemType.Topic, name: "Eventos" }));
    menu.push(new ItemMenu({ name: "Transmissão ao vivo", route: "/lives", htmlIco: IsSVG("video") }));
    return menu;
  }
}

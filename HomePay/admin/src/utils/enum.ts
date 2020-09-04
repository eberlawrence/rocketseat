export enum UserType {
  Administrador,
  Professor,
  Tutor,
  Estudante,
}

const mapEnum = (e: number): string => {
  return UserType[e];
};

export { mapEnum };

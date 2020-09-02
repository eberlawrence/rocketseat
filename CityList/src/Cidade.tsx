import React from "react";

interface Props {
  id: number;
  cidade: string;
  estado: string;
  onEdit: any;
  onDelete: any;
}

const Cidade: React.FC<Props> = ({ id, cidade, estado, onEdit, onDelete }) => {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>{id}</td>
      <td>{cidade}</td>
      <td>{estado}</td>
      <td>
        <button onClick={onEdit} className="mini ui blue button">
          Editar
        </button>
        <button onClick={onDelete} className="mini ui red button">
          Deletar
        </button>
      </td>
    </tr>
  );
};

export default Cidade;

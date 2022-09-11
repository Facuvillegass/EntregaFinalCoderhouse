import "./FormModal.css"

const FormModal = ({title,children}) => {
  return (
    <div className="formModal">
      <h2 className="tituloFormulario">{title}</h2>
      {children}
    </div>
  );
};

export default FormModal;

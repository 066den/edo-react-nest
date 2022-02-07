const Heading = ({ title }) => {
  return (
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-3">
        <div className="breadcrumbs-top">
          <h2 className="content-header-title float-start mb-0">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Heading;

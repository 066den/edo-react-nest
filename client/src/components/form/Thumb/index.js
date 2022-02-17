import { useEffect, useState } from "react";

const Thumb = ({ file, className }) => {
  const [thumb, setThumb] = useState(null);

  useEffect(() => {
    if (!file) return;
    if (file.name) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setThumb(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  if (!file) return null;

  if (file.name) {
    return <img src={thumb} alt={file.name} className={className} />;
  }

  return (
    <img
      src={`${process.env.REACT_APP_API_URL}/image/${file}`}
      alt="avatar"
      className={className}
    />
  );
};

export default Thumb;

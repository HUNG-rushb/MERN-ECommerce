import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Hưng's shop nhe",
  description: "Yêu bạn Quỳnh nhìu lắm luôn <3",
  keywords: "electronics, buy electronics, cheap electroincs",
};

export default Meta;

function FormHeader({ title, description }) {
  return (
    <div className="@container">
      <h1 className="mb-2.5 text-2xl font-bold text-blue-marine @sm:text-[32px]">
        {title}
      </h1>
      <p className="mb-5 text-gray-cool @sm:mb-10">{description}</p>
    </div>
  );
}

export default FormHeader;

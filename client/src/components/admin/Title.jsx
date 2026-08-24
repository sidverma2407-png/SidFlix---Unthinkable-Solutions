const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-primary"></div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {text1}{" "}
          <span className="text-primary">
            {text2}
          </span>
        </h1>
      </div>

      <div className="ml-4 mt-2 h-px w-24 bg-primary/30"></div>
    </div>
  );
};

export default Title;
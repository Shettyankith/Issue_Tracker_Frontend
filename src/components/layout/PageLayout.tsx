

interface Props {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: Props) => {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto p-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            {title}
          </h1>

        </div>

        {children}

      </div>

    </div>
  );
};

export default PageLayout;
type PageProps = {
    title: string;
};

export default function Header({title}: PageProps) {
    return (<header className="flex items-center justify-center w-full py-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
    );
}
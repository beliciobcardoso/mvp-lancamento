import Link from "next/link";

const data = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Lançamentos",
        url: "/lancamentos",
        subitems: [
            {
                name: "Cadastra Lançamentos",
                url: "/lancamentos/register",
            },
            {
                name: "Lista Lançamentos",
                url: "/lancamentos/list",
            },
        ],
    },
    {
        name: "Fornecedores",
        url: "/fornecedores",
        subitems: [
            {
                name: "Cadastra Fornecedores",
                url: "/fornecedores/register",
            },
            {
                name: "Lista Fornecedores",
                url: "/fornecedores/list",
            },
        ],
    },
    {
        name: "Tipos",
        url: "/tipos",
        subitems: [
            {
                name: "Cadastra Tipos",
                url: "/tipos/register",
            },
            {
                name: "Lista Tipos",
                url: "/tipos/list",
            },
        ],
    }
]


export default function Menu() {
  return (
    <nav className="flex flex-col p-4 w-[250px] h-full bg-gray-200">
      {data.map((item) => (
        <div key={item.name}>
            <h2>
                {item.name}
            </h2>           
            {item.subitems && (
                <ul className="flex flex-col h-[100px]">
                    {item.subitems.map((subitem) => (
                        <li key={subitem.name} className="flex">
                            <Link
                            className="text-white cursor-pointer bg-blue-500 hover:bg-blue-700 p-2 rounded mb-2"
                                href={subitem.url}
                            >
                               {subitem.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        ))}
    </nav>
  );
}
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import DoadorChatPage from "./pages/DoadorChatPage";
import CadastroOngPage from "./pages/CadastroOngPage";

export const router = createBrowserRouter([
    {
        element: <RootLayout/>,
        children:[
            {
                path: '/',
                element: <DoadorChatPage/>,
            },
            {
                path: '/cadastrar-ong',
                element: <CadastroOngPage/>,
            }
        ]
    }
], {
    basename: import.meta.env.BASE_URL
})
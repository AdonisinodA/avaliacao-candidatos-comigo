import { ErrorCustom } from "./errorCustom";

export default function AppError(message = 'Erro interno'){
    throw new ErrorCustom(message)
}
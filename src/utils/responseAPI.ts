import { NextApiResponse } from "next"

export const responseAPI = (res: NextApiResponse, status: boolean, statusCode: number, message: string, data?: any) => {
    return res.status(statusCode).json({
        status,
        statusCode,
        message,
        data
    })
}

export const responseFailed = (res: NextApiResponse) => {
    responseAPI(res, false, 400, "Failed")
}

export const responseAccessDenied = (res: NextApiResponse) => {
    responseAPI(res, false, 403, "Acces Denied")
}

export const responseSuccess = (res: NextApiResponse) => {
    responseAPI(res, true, 200, "Success")
}

export const responseData = (res: NextApiResponse, data: any) => {
    responseAPI(res, true, 200, "Success", data)
}

export const responseNotFound = (res: NextApiResponse) => {
    responseAPI(res, false, 404, "Not Found")
}

export const responseMethodNotAllowed = (res: NextApiResponse) => {
    responseAPI(res, false, 405, "Method Not Allowed")
}
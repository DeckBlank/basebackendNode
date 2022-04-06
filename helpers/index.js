export const responseJson = ({data}) => {
    if (data===null) return {
        message:'not data',
        status: 500
    }
    return {
        data,
        message:'your data',
        status: 200
    }
}
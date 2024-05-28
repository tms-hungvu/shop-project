import useSwr from 'swr'



export const useRequest = (path : string, name ?: string | number) => {
    if (!path) {
        throw new Error('Path is required')
    }

    const url = name ?  `${process.env.NEXT_PUBLIC_URL_API}/${path}/${name}` : `${process.env.NEXT_PUBLIC_URL_API}/${path}`
    const { data, error, isLoading } = useSwr(url)

    return { data, error,  isLoading  }
}

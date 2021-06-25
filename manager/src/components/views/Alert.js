import { Alert } from 'react-bootstrap'

const RaiseAlert = ({info}) => {
    if (info !== null) {
        return <Alert variant={info.type}>{info.message}</Alert>
    }
    return null
}

export default RaiseAlert
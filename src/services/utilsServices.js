import {brasilApiHealth} from '../APIs/brasilAPI.js';
import {geocodingHealthCheck} from '../APIs/geoCoding.js';

export const heathCheckService = async () => {

    try {
        const brasilApiStatus = await brasilApiHealth();
        const geocodingStatus = await geocodingHealthCheck();
        
        let stausPayload;
        let motivoErro;
        let payload;

        if (brasilApiStatus.status === 'error') {
            stausPayload = "degraded";
            motivoErro = brasilApiStatus.message;
        }

        else if (geocodingStatus.status === 'error') {
            stausPayload = "degraded";
            motivoErro = geocodingStatus.message;
        }

        else {
            stausPayload = "healthy";
        }

        payload = {
            status: stausPayload,
            versao: "1.0.0",
            timestamp: new Date().toISOString(),
        };
        
        if(motivoErro) {
            payload.motivo = motivoErro;
        }

        console.log(payload);

        return payload;

    } catch (error) {
        return {
            status: 'error',
            message: "Erro ao realizar o health check"
        };
    }
}
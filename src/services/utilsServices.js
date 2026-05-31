import {brasilApiHealth} from '../APIs/brasilAPI.js';
import {geocodingHealthCheck} from '../APIs/geoCoding.js';

export const healthCheckService = async () => {

    try {
        const brasilApiStatus = await brasilApiHealth();
        const geocodingStatus = await geocodingHealthCheck();
        
        let statusPayload;
        let motivoErro;
        let payload;

        if (brasilApiStatus.status === 'error') {
            statusPayload = "degraded";
            motivoErro = brasilApiStatus.message;
        }

        else if (geocodingStatus.status === 'error') {
            statusPayload = "degraded";
            motivoErro = geocodingStatus.message;
        }

        else {
            statusPayload = "healthy";
        }

        payload = {
            status: statusPayload,
            versao: "1.0.0",
            timestamp: new Date().toISOString(),
        };
        
        if(motivoErro) {
            payload.motivo = motivoErro;
        }

        return payload;

    } catch (error) {
        return {
            status: 'error',
            message: "Erro ao realizar o health check"
        };
    }
}
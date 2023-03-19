import { API } from '../base';

export interface IAuthResponseTokens {
    refresh: string;
    access: string;
}
export interface IAuthResponse {
    statusCode: number;
    tokens: IAuthResponseTokens;
}

class AuthService {
    static async login(username: string, password: string): Promise<IAuthResponse | null> {
        return await API.post<IAuthResponseTokens>('/api/token/', {
            username,
            password,
        })
            .then(value => {
                return { statusCode: value.status, tokens: value.data };
            })
            .catch(error => {
                return null;
            });
    }

    static async refresh() {
        if (localStorage.getItem('_refresh')) {
            return await API.post<IAuthResponseTokens>('/api/token/refresh/', {
                refresh: localStorage.getItem('_refresh'),
            })
                .then(value => {
                    return { statusCode: value.status, tokens: value.data };
                })
                .catch(error => {
                    console.log('Ошибка авторизации', error);
                    return null;
                });
        } else return null;
    }
}

export { AuthService };

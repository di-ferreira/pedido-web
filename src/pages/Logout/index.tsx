import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';

export const Logout: React.FC = () => {
    const [time, setTime] = useState(3);
    const [timeOut] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        clearTimeout(timeOut);

        setTimeout(() => {
            setTime((t) => t - 1);
        }, 2000);

        if (time <= 0) {
            navigate('/login');
        }

        return () => {
            clearTimeout(timeOut);
        };
    }, [navigate, time, timeOut]);

    return (
        <Container>
            <h1>Saindo...</h1>
        </Container>
    );
};

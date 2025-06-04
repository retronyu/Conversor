const { useState, useEffect } = React;

const App = () => {
    const [copAmount, setCopAmount] = useState('');
    const [usdRate, setUsdRate] = useState(0);
    const [eurRate, setEurRate] = useState(0);
    const [cnyRate, setCnyRate] = useState(0);
    const [convertedUsd, setConvertedUsd] = useState('');
    const [convertedEur, setConvertedEur] = useState('');
    const [convertedCny, setConvertedCny] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchExchangeRates = async () => {
        setLoading(true);
        setError('');
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const simulatedData = {
                USD_COP: 3900,
                EUR_COP: 4200,
                CNY_COP: 540
            };
            setUsdRate(1 / simulatedData.USD_COP);
            setEurRate(1 / simulatedData.EUR_COP);
            setCnyRate(1 / simulatedData.CNY_COP);
        } catch (err) {
            console.error("Error fetching exchange rates:", err);
            setError("No se pudieron cargar las tasas de cambio. Inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExchangeRates();
    }, []);

    useEffect(() => {
        const amount = parseFloat(copAmount);
        if (isNaN(amount) || amount <= 0) {
            setConvertedUsd('');
            setConvertedEur('');
            setConvertedCny('');
            return;
        }
        setConvertedUsd((amount * usdRate).toFixed(2));
        setConvertedEur((amount * eurRate).toFixed(2));
        setConvertedCny((amount * cnyRate).toFixed(2));
    }, [copAmount, usdRate, eurRate, cnyRate]);

    const handleCopChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setCopAmount(value);
        }
    };

    return (
        React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4 font-inter' },
            React.createElement('div', { className: 'bg-white p-8 rounded-xl shadow-2xl w-full max-w-md' },
                React.createElement('h1', { className: 'text-3xl font-extrabold text-center text-gray-900 mb-6' }, 'Convertidor de Moneda'),
                loading ? (
                    React.createElement('div', { className: 'text-center py-8' },
                        React.createElement('div', { className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4' }),
                        React.createElement('p', { className: 'text-gray-600' }, 'Cargando tasas de cambio...')
                    )
                ) : error ? (
                    React.createElement('div', { className: 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4', role: 'alert' },
                        React.createElement('strong', { className: 'font-bold' }, '¡Error!'),
                        React.createElement('span', { className: 'block sm:inline' }, ' ', error)
                    )
                ) : (
                    React.createElement(React.Fragment, null,
                        React.createElement('div', { className: 'mb-6 bg-blue-50 p-4 rounded-lg shadow-inner' },
                            React.createElement('p', { className: 'text-lg font-semibold text-gray-800 mb-2' }, 'Tasas de Cambio Actuales (Simuladas):'),
                            React.createElement('p', { className: 'text-md text-gray-700' }, '1 USD = ', React.createElement('span', { className: 'font-bold' }, (1 / usdRate).toFixed(2), ' COP')),
                            React.createElement('p', { className: 'text-md text-gray-700' }, '1 EUR = ', React.createElement('span', { className: 'font-bold' }, (1 / eurRate).toFixed(2), ' COP')),
                            React.createElement('p', { className: 'text-md text-gray-700' }, '1 CNY = ', React.createElement('span', { className: 'font-bold' }, (1 / cnyRate).toFixed(2), ' COP')),
                            React.createElement('p', { className: 'text-sm text-gray-500 mt-2' },
                                React.createElement('span', { className: 'font-medium' }, 'Nota:'), ' Estas tasas son simuladas. Para tasas reales, integre una API de terceros.'
                            )
                        ),
                        React.createElement('div', { className: 'mb-6' },
                            React.createElement('label', { htmlFor: 'copInput', className: 'block text-gray-700 text-sm font-bold mb-2' }, 'Cantidad en Pesos Colombianos (COP):'),
                            React.createElement('input', {
                                type: 'number',
                                step: '0.01',
                                id: 'copInput',
                                className: 'shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200',
                                placeholder: 'Ej: 100000',
                                value: copAmount,
                                onChange: handleCopChange
                            })
                        ),
                        React.createElement('div', { className: 'space-y-4' },
                            React.createElement('div', { className: 'bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-sm' },
                                React.createElement('span', { className: 'text-gray-700 font-medium' }, 'Dólar Estadounidense (USD):'),
                                React.createElement('span', { className: 'text-blue-700 font-bold text-xl' }, convertedUsd ? `$${convertedUsd}` : '0.00')
                            ),
                            React.createElement('div', { className: 'bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-sm' },
                                React.createElement('span', { className: 'text-gray-700 font-medium' }, 'Euro (EUR):'),
                                React.createElement('span', { className: 'text-green-700 font-bold text-xl' }, convertedEur ? `€${convertedEur}` : '0.00')
                            ),
                            React.createElement('div', { className: 'bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-sm' },
                                React.createElement('span', { className: 'text-gray-700 font-medium' }, 'Yuan Chino (CNY):'),
                                React.createElement('span', { className: 'text-red-700 font-bold text-xl' }, convertedCny ? `¥${convertedCny}` : '0.00')
                            )
                        )
                    )
                )
            )
        )
    );
};

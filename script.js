document.addEventListener('DOMContentLoaded', () => {
    const temperatureInput = document.getElementById('temperatureInput');
    const temperatureInputLabel = document.getElementById('temperatureInputLabel'); 
    const inputType = document.getElementById('inputType');
    const outputType = document.getElementById('outputType');
    const convertButton = document.getElementById('convertButton');
    const convertedTemperatureDisplay = document.getElementById('convertedTemperature');

    
    function updateInputLabel() {
        const selectedInputText = inputType.options[inputType.selectedIndex].text;
        temperatureInputLabel.textContent = `Degrees (${selectedInputText}):`;
    }

    
    updateInputLabel();

    
    inputType.addEventListener('change', updateInputLabel);


    convertButton.addEventListener('click', () => {
        const inputValue = parseFloat(temperatureInput.value);
        const selectedInputType = inputType.value;
        const selectedOutputType = outputType.value;
        let convertedValue;
        let unit = '';

        
        if (isNaN(inputValue)) {
            convertedTemperatureDisplay.textContent = 'Please enter a valid number!';
            convertedTemperatureDisplay.style.color = 'red';
            return;
        }

        if (selectedInputType === selectedOutputType) {
            convertedTemperatureDisplay.textContent = `${inputValue} ${getUnitSymbol(selectedInputType)}`;
            convertedTemperatureDisplay.style.color = '#0056b3'; 
            return;
        }

        convertedTemperatureDisplay.style.color = '#28a745'; 

        let valueInKelvin;

        switch (selectedInputType) {
            case 'celsius':
                valueInKelvin = inputValue + 273.15;
                break;
            case 'fahrenheit':
                valueInKelvin = (inputValue - 32) * 5 / 9 + 273.15;
                break;
            case 'kelvin':
                valueInKelvin = inputValue;
                break;
            default:
                convertedTemperatureDisplay.textContent = 'Invalid input type selected.';
                convertedTemperatureDisplay.style.color = 'red';
                return;
        }


        switch (selectedOutputType) {
            case 'celsius':
                convertedValue = valueInKelvin - 273.15;
                unit = '°C';
                break;
            case 'fahrenheit':
                convertedValue = (valueInKelvin - 273.15) * 9 / 5 + 32;
                unit = '°F';
                break;
            case 'kelvin':
                convertedValue = valueInKelvin;
                unit = 'K';
                break;
            default:
                convertedTemperatureDisplay.textContent = 'Invalid output type selected.';
                convertedTemperatureDisplay.style.color = 'red';
                return;
        }

        convertedTemperatureDisplay.textContent = `${convertedValue.toFixed(4)} ${unit}`;
    });

    function getUnitSymbol(type) {
        switch (type) {
            case 'celsius':
                return '°C';
            case 'fahrenheit':
                return '°F';
            case 'kelvin':
                return 'K';
            default:
                return '';
        }
    }
});
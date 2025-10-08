import React, { useState } from 'react';
import './App.css'; 

function App() {
    // 1. STATE: Ekranda görünen sonucu/sayıyı tutar
    const [display, setDisplay] = useState('0');
    // 2. STATE: Hesaplama için girilen tüm formülü (Örn: "5 + 3 * 2") tutar
    const [formula, setFormula] = useState('');

    // Butonlara tıklandığında çalışacak ana fonksiyon
    const handleButtonClick = (value) => {
        // Hata durumunu temizle
        if (display === 'Error') {
            setDisplay('0');
            setFormula('');
        }

        // 'AC' (Hepsini Temizle) butonu
        if (value === 'AC') {
            setDisplay('0');
            setFormula('');
            return;
        }

        // '=' (Eşittir) butonu
        if (value === '=') {
            if (!formula) return;
            try {
                // Güvenlik uyarısı: eval() basit projeler için uygundur.
                const result = eval(formula).toString();
                setDisplay(result);
                setFormula(result); // Formülü sonuçla güncelliyoruz
            } catch {
                setDisplay('Error');
                setFormula('');
            }
            return;
        }

        // Diğer butonlar (Sayılar ve Operatörler)
        setFormula(prevFormula => {
            let newFormula = prevFormula;
            
            // Eğer önceki işlem bittiyse ve yeni tuş sayı ise, formülü sıfırla
            if (prevFormula === display && !['+', '-', '*', '/'].includes(value)) {
                newFormula = '';
            }
            
            // Eğer display '0' ise ve yeni gelen sayı ise, '0'ı kaldır
            if (newFormula === '0' && value !== '.') {
                newFormula = '';
            }

            // Çift operatör veya hatalı girişleri engelleme
            const lastChar = newFormula.slice(-1);
            if (['+', '*', '/'].includes(lastChar) && ['+', '*', '/'].includes(value)) {
                return prevFormula; 
            }
            
            // Yeni değeri formüle ekle
            newFormula += value;
            
            // Ekranda gösterilecek değeri belirle
            if (['+', '-', '*', '/'].includes(value)) {
                 // Operatör girildiyse, ekranda sadece o operatörü göster
                 setDisplay(value);
            } else {
                 // Sayı/Nokta girildiyse, formüldeki son sayıyı veya operatörü bulup ekrana yaz
                 const tokens = newFormula.match(/[\d\.]+|[\+\-\*\/]/g) || ['0'];
                 setDisplay(tokens[tokens.length - 1]);
            }

            return newFormula;
        });
    };

    // Hesap makinesi butonlarının yapısı
    const buttons = [
        { label: 'AC', className: 'function' },
        { label: '+/-', className: 'function' },
        { label: '%', className: 'function' },
        { label: '/', className: 'operator' },
        { label: '7', className: 'number' },
        { label: '8', className: 'number' },
        { label: '9', className: 'number' },
        { label: '*', className: 'operator' },
        { label: '4', className: 'number' },
        { label: '5', className: 'number' },
        { label: '6', className: 'number' },
        { label: '-', className: 'operator' },
        { label: '1', className: 'number' },
        { label: '2', className: 'number' },
        { label: '3', className: 'number' },
        { label: '+', className: 'operator' },
        { label: '0', className: 'number zero' }, 
        { label: '.', className: 'number' },
        { label: '=', className: 'operator equals' }, 
    ];

    return (
        <div className="calculator-wrapper">
            <div className="display-area">
                {/* Tüm işlemi gösterir */}
                <div className="formula-text">{formula}</div> 
                {/* Kullanıcının odaklanacağı anlık sayıyı veya sonucu gösterir */}
                <div className="display-text">{display}</div>
            </div>
            <div className="buttons-grid">
                {buttons.map((btn) => (
                    <button
                        key={btn.label}
                        onClick={() => handleButtonClick(btn.label)}
                        className={`${btn.className}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App;
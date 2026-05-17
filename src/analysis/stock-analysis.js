/**
 * Stock Analysis Module
 * 주식 분석 기능
 */

class StockAnalyzer {
  constructor(apiKey, apiEndpoint) {
    this.apiKey = apiKey;
    this.apiEndpoint = apiEndpoint;
    this.stockCache = new Map();
  }

  /**
   * 주식 정보 조회
   * @param {string} symbol - 종목 코드 (예: AAPL, GOOGL, 005930)
   */
  async getStockInfo(symbol) {
    try {
      // 캐시 확인
      if (this.stockCache.has(symbol)) {
        return this.stockCache.get(symbol);
      }

      const response = await fetch(`${this.apiEndpoint}/stock/${symbol}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`주식 정보 조회 실패: ${response.status}`);
      }

      const data = await response.json();
      
      // 캐시에 저장 (5분 유효)
      this.stockCache.set(symbol, data);
      setTimeout(() => this.stockCache.delete(symbol), 300000);

      return data;
    } catch (error) {
      console.error('주식 정보 조회 오류:', error);
      throw error;
    }
  }

  /**
   * 기술 분석 지표 계산
   * @param {array} prices - 가격 배열 [{ date, close }, ...]
   * @param {number} period - 기간 (기본값: 20)
   */
  calculateMovingAverage(prices, period = 20) {
    if (prices.length < period) {
      throw new Error('충분한 데이터가 없습니다.');
    }

    const ma = [];
    
    for (let i = period - 1; i < prices.length; i++) {
      const sum = prices
        .slice(i - period + 1, i + 1)
        .reduce((acc, p) => acc + p.close, 0);
      
      ma.push({
        date: prices[i].date,
        ma: sum / period
      });
    }

    return ma;
  }

  /**
   * RSI (Relative Strength Index) 계산
   * @param {array} prices - 가격 배열
   * @param {number} period - 기간 (기본값: 14)
   */
  calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) {
      throw new Error('충분한 데이터가 없습니다.');
    }

    const changes = [];
    for (let i = 1; i < prices.length; i++) {
      changes.push(prices[i].close - prices[i - 1].close);
    }

    const gains = changes.map(c => c > 0 ? c : 0);
    const losses = changes.map(c => c < 0 ? -c : 0);

    let avgGain = gains.slice(0, period).reduce((a, b) => a + b) / period;
    let avgLoss = losses.slice(0, period).reduce((a, b) => a + b) / period;

    const rsi = [];

    for (let i = period; i < changes.length; i++) {
      avgGain = (avgGain * (period - 1) + gains[i]) / period;
      avgLoss = (avgLoss * (period - 1) + losses[i]) / period;

      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      const rsiValue = 100 - (100 / (1 + rs));

      rsi.push({
        date: prices[i + 1].date,
        rsi: rsiValue
      });
    }

    return rsi;
  }

  /**
   * MACD (Moving Average Convergence Divergence) 계산
   * @param {array} prices - 가격 배열
   */
  calculateMACD(prices) {
    if (prices.length < 26) {
      throw new Error('충분한 데이터가 없습니다.');
    }

    const ema12 = this._calculateEMA(prices, 12);
    const ema26 = this._calculateEMA(prices, 26);

    const macd = [];
    for (let i = 0; i < ema12.length; i++) {
      macd.push({
        date: prices[25 + i].date,
        macd: ema12[i] - ema26[i]
      });
    }

    return macd;
  }

  /**
   * EMA (Exponential Moving Average) 계산 (내부용)
   */
  _calculateEMA(prices, period) {
    const ema = [];
    const multiplier = 2 / (period + 1);
    
    let sma = 0;
    for (let i = 0; i < period; i++) {
      sma += prices[i].close;
    }
    sma /= period;

    let emaValue = sma;
    for (let i = period; i < prices.length; i++) {
      emaValue = (prices[i].close - emaValue) * multiplier + emaValue;
      ema.push(emaValue);
    }

    return ema;
  }

  /**
   * 변동성 분석
   * @param {array} prices - 가격 배열
   * @param {number} period - 기간 (기본값: 20)
   */
  calculateVolatility(prices, period = 20) {
    if (prices.length < period) {
      throw new Error('충분한 데이터가 없습니다.');
    }

    const volatility = [];
    
    for (let i = period - 1; i < prices.length; i++) {
      const window = prices.slice(i - period + 1, i + 1);
      const mean = window.reduce((sum, p) => sum + p.close, 0) / period;
      
      const variance = window.reduce((sum, p) => {
        return sum + Math.pow(p.close - mean, 2);
      }, 0) / period;
      
      const stdDev = Math.sqrt(variance);
      const volatilityPct = (stdDev / mean) * 100;

      volatility.push({
        date: prices[i].date,
        volatility: volatilityPct
      });
    }

    return volatility;
  }

  /**
   * 성과 분석
   * @param {array} prices - 가격 배열
   * @param {string} startDate - 시작 날짜
   * @param {string} endDate - 종료 날짜
   */
  calculatePerformance(prices, startDate, endDate) {
    const start = prices.find(p => p.date === startDate);
    const end = prices.find(p => p.date === endDate);

    if (!start || !end) {
      throw new Error('해당 날짜의 데이터가 없습니다.');
    }

    const returnPct = ((end.close - start.close) / start.close) * 100;
    const maxPrice = Math.max(...prices.map(p => p.close));
    const minPrice = Math.min(...prices.map(p => p.close));
    const drawdown = ((minPrice - maxPrice) / maxPrice) * 100;

    return {
      startDate: startDate,
      endDate: endDate,
      startPrice: start.close,
      endPrice: end.close,
      returnPercentage: returnPct,
      maxPrice: maxPrice,
      minPrice: minPrice,
      maxDrawdown: drawdown
    };
  }

  /**
   * 추천 신호 생성
   * @param {object} indicators - 지표 객체 { rsi, macd, ma }
   */
  generateSignal(indicators) {
    const signals = [];
    const { rsi, macd, ma } = indicators;

    // RSI 신호
    if (rsi && rsi.length > 0) {
      const lastRSI = rsi[rsi.length - 1].rsi;
      if (lastRSI < 30) {
        signals.push({ type: 'BUY', source: 'RSI', strength: 'strong' });
      } else if (lastRSI > 70) {
        signals.push({ type: 'SELL', source: 'RSI', strength: 'strong' });
      }
    }

    // MACD 신호
    if (macd && macd.length > 1) {
      const current = macd[macd.length - 1].macd;
      const previous = macd[macd.length - 2].macd;
      
      if (previous < 0 && current >= 0) {
        signals.push({ type: 'BUY', source: 'MACD', strength: 'medium' });
      } else if (previous > 0 && current <= 0) {
        signals.push({ type: 'SELL', source: 'MACD', strength: 'medium' });
      }
    }

    return {
      signals: signals,
      timestamp: new Date().toISOString(),
      recommendation: signals.length > 0 ? signals[0].type : 'HOLD'
    };
  }
}

module.exports = StockAnalyzer;

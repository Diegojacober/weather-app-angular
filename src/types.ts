export interface ApiResonse {
    type: string
    query: string[]
    features: Feature[]
    attribution: string
  }
  
  export interface Feature {
    id: string
    type: string
    place_type: string[]
    relevance: number
    properties: Properties
    text: string
    place_name: string
    bbox: number[]
    center: number[]
    geometry: Geometry
    context: Context[]
  }
  
  export interface Properties {
    mapbox_id: string
    wikidata: string
  }
  
  export interface Geometry {
    type: string
    coordinates: number[]
  }
  
  export interface Context {
    id: string
    mapbox_id: string
    wikidata: string
    short_code: string
    text: string
  }

  export interface WeatherResponse {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current: Current
    minutely: Minutely[]
    hourly: Hourly[]
    daily: Daily[]
  }
  
  export interface Current {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather[]
  }
  
  export interface Weather {
    id: number
    main: string
    description: string
    icon: string
  }
  
  export interface Minutely {
    dt: number
    precipitation: number
  }
  
  export interface Hourly {
    dt: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather2[]
    pop: number
    rain?: Rain
  }
  
  export interface Weather2 {
    id: number
    main: string
    description: string
    icon: string
  }
  
  export interface Rain {
    "1h": number
  }
  
  export interface Daily {
    dt: number
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    temp: Temp
    feels_like: FeelsLike
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather3[]
    clouds: number
    pop: number
    rain?: number
    uvi: number
  }
  
  export interface Temp {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  
  export interface FeelsLike {
    day: number
    night: number
    eve: number
    morn: number
  }
  
  export interface Weather3 {
    id: number
    main: string
    description: string
    icon: string
  }
  

Weather Website – Check the weather in any city

A simple and responsive Weather App built using HTML, CSS, and JavaScript.

This website allows users to check the current temperature and weather conditions of any city in real time.

The project uses a weather API to fetch live data and displays it in a clean, user-friendly interface.

Features

Temperature, 
Feels like, 
Wind speed, 
Humidity

And a few more....

I use OpenWeather API. Sign up for an API key.

API key setup (secure)

1. Copy `.env.example` to `.env`
2. Set your key:

OPENWEATHER_API_KEY=your_real_openweather_api_key

3. Run the app with a PHP server from the project root:

php -S localhost:8000

Then open http://localhost:8000

The key is now read in `weather.php` from the environment and is not stored in frontend JavaScript.


Desktop

![alt text](<images/Screenshot 2026-02-15 124226.png>)


Desktop with error

![alt text](<images/Screenshot 2026-02-15 124421.png>)

Mobile view

![alt text](<images/Screenshot 2026-02-15 124617-1.png>)

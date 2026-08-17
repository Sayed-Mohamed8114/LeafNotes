from pydantic_settings import BaseSettings , SettingsConfigDict
class Settings(BaseSettings):
    DATABASE_URL : str 
    model_config = SettingsConfigDict(env_file=".env")

# in this step we make a instance from settings so every file in the project can make a import 
settings = Settings()

from pydantic_settings import BaseSettings , SettingsConfigDict
class Settings(BaseSettings):
    DATABASE_URL:str 
    JWT_SECRET_KEY:str
    JWT_ALGORITHM:str
    ACCESS_TOKEN_EXPIRE_MINUTES:int
    TEST_DATABASE_URL:str
    model_config=SettingsConfigDict(env_file=".env")

# in this step we make a instance from settings so every file in the project can make a import 
settings = Settings()

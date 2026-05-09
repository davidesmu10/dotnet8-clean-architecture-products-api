FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar todo el proyecto (estructura Visual Studio)
COPY . .

# Restaurar usando el csproj correcto
RUN dotnet restore "asisya_api.csproj"

# Compilar
RUN dotnet build "asisya_api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "asisya_api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "asisya_api.dll"]
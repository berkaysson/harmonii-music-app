# 1. Aşama: Çalışma Zamanı (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# 2. Aşama: Derleme (Build)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Önbellekleme için sadece proje dosyalarını kopyala
COPY ["harmonii.Server/harmonii.Server.csproj", "harmonii.Server/"]
COPY ["harmonii.Services/harmonii.Services.csproj", "harmonii.Services/"]
RUN dotnet restore "harmonii.Server/harmonii.Server.csproj"

# Tüm kodu kopyala ve derle
COPY . .
WORKDIR "/src/harmonii.Server"
RUN dotnet build "harmonii.Server.csproj" -c Release -o /app/build --no-restore -p:IsCI=true -p:ShouldRunBuildScript=false

# 3. Aşama: Yayınlama (Publish)
FROM build AS publish
# BURAYA DİKKAT: -p:IsCI=true eklenmek zorundadır
RUN dotnet publish "harmonii.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false -p:ShouldRunBuildScript=false -p:IsCI=true

# 4. Aşama: Final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "harmonii.Server.dll"]
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy solution and all projects
COPY ./LocalBrandFinder.sln ./
COPY ./LocalBrandFinder.API ./LocalBrandFinder.API
COPY ./LocalBrandFinder.Application ./LocalBrandFinder.Application
COPY ./LocalBrandFinder.Domain ./LocalBrandFinder.Domain
COPY ./LocalBrandFinder.Infrastructure ./LocalBrandFinder.Infrastructure
COPY ./TestProject1 ./TestProject1  

# Restore dependencies
RUN dotnet restore LocalBrandFinder.sln

# Publish API project
RUN dotnet publish LocalBrandFinder.API/LocalBrandFinder.API.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 5033
ENV ASPNETCORE_URLS=http://+:5033
ENTRYPOINT ["dotnet", "LocalBrandFinder.API.dll"]

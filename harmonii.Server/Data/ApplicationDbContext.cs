﻿using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace harmonii.Server.Data
{
    public class ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options) :
        IdentityDbContext<UserIdentity, RoleIdentity, int>(options)
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Define relationships between entities using Fluent API
            //UserIdentity and UserProfile: 1-to-1 relationship.
            builder.Entity<UserIdentity>()
                .HasOne(e => e.UserProfile)
                .WithOne(e => e.UserIdentity)
                .HasForeignKey<UserProfile>(e => e.UserIdentityId);

            //Genre and Songs: 1-to-Many relationship.
            builder.Entity<Genre>()
                .HasMany(e => e.Songs)
                .WithOne(e => e.Genre)
                .HasForeignKey(e => e.GenreId);

            //Song and UserProfile (User owns Songs): Many-to-1 relationship
            //with no cascading delete
            builder.Entity<Song>()
                .HasOne(s => s.UserProfile)
                .WithMany(u => u.Songs)
                .HasForeignKey(s => s.UserProfileId)
                .OnDelete(DeleteBehavior.NoAction);

            //UserProfile and Playlists: 1-to-Many relationship.
            builder.Entity<UserProfile>()
                .HasMany(e => e.Playlists)
                .WithOne(e => e.UserProfile)
                .HasForeignKey(e => e.UserProfileId);

            //Song and Playlists: Many-to-Many relationship.
            builder.Entity<Song>()
                .HasMany(e => e.Playlists)
                .WithMany(e => e.Songs);

            SeedRoles(builder);
            //SeedGenres(builder);
        }

        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<Genre> Genres { get; set; }

        //Seed methods
        private static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<RoleIdentity>().HasData(
                new RoleIdentity() { Id = 1, Name = "Standard", ConcurrencyStamp = "1", NormalizedName = "STANDARD" },
                new RoleIdentity() { Id = 2, Name = "Moderator", ConcurrencyStamp = "2", NormalizedName = "MODERATOR" },
                new RoleIdentity() { Id = 3, Name = "Admin", ConcurrencyStamp = "3", NormalizedName = "ADMIN" }
                );
        }

        private static void SeedGenres(ModelBuilder builder)
        {
            var genresJson = File.ReadAllText("./Data/genres.json");
            var genres = JsonSerializer.Deserialize<List<Genre>>(genresJson);
            if (genres != null && genres.Count > 0)
                builder.Entity<Genre>().HasData(genres);
        }
    }
}

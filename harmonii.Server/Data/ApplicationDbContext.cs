using harmonii.Server.Models.Entities;
using harmonii.Server.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace harmonii.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<UserIdentity, RoleIdentity, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserProfile>()
                .HasOne(e => e.UserIdentity)
                .WithOne(e => e.UserProfile)
                .HasForeignKey<UserIdentity>(e => e.UserProfileId);

            builder.Entity<Genre>()
                .HasMany(e => e.Songs)
                .WithOne(e => e.Genre)
                .HasForeignKey(e => e.GenreId);

            builder.Entity<Song>()
                .HasOne(s => s.UserProfile)
                .WithMany(u => u.Songs)
                .HasForeignKey(s => s.UserProfileId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<UserProfile>()
                .HasMany(e => e.Playlists)
                .WithOne(e => e.UserProfile)
                .HasForeignKey(e => e.UserProfileId);

            builder.Entity<Song>()
                .HasMany(e => e.Playlists)
                .WithMany(e => e.Songs);

            SeedRoles(builder);
            SeedGenres(builder);
        }

        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<Genre> Genres { get; set; }

        private static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<RoleIdentity>().HasData(
                new RoleIdentity() { Id = 1, Name = "Standard", ConcurrencyStamp = "1", NormalizedName= "STANDARD" },
                new RoleIdentity() { Id = 2, Name = "Moderator", ConcurrencyStamp = "2", NormalizedName = "MODERATOR" },
                new RoleIdentity() { Id = 3, Name = "Admin", ConcurrencyStamp = "3", NormalizedName = "ADMIN" }
                );
        }

        private static void SeedGenres(ModelBuilder builder)
        {
            var genresJson = File.ReadAllText("./Data/genres.json");
            var genres = JsonSerializer.Deserialize<List<Genre>>(genresJson);
            builder.Entity<Genre>().HasData(genres);
        }
    }
}

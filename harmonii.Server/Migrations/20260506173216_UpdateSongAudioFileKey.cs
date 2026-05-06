using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace harmonii.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSongAudioFileKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AudioFileUrl",
                table: "Songs",
                newName: "AudioFileKey");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AudioFileKey",
                table: "Songs",
                newName: "AudioFileUrl");
        }
    }
}

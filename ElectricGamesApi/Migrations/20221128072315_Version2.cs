﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectricGamesApi.Migrations
{
    /// <inheritdoc />
    public partial class Version2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Quizzez",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Question1 = table.Column<string>(type: "TEXT", nullable: false),
                    Question2 = table.Column<string>(type: "TEXT", nullable: false),
                    Question3 = table.Column<string>(type: "TEXT", nullable: false),
                    Question4 = table.Column<string>(type: "TEXT", nullable: false),
                    Answer = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quizzez", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Quizzez");
        }
    }
}

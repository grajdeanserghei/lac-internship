using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MlApiComp.Migrations
{
    public partial class AddedAzureApiAndGoogleApiResponseColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AzureApiResult",
                table: "Files",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GoogleApiResult",
                table: "Files",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AzureApiResult",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "GoogleApiResult",
                table: "Files");
        }
    }
}

using Microsoft.EntityFrameworkCore;
using PasswordBox.Entities;

namespace PasswordBox.Contexts
{
    public class PasswordBoxDbContext : DbContext
    {
        public DbSet<Password> Password { get; set; }
        public PasswordBoxDbContext(DbContextOptions builder) : base(builder)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Password>()
                .ToTable("Passwords")
                .HasKey(x => x.Id);


        }

    }
}
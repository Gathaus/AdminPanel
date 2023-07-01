using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Web.Models;

[Table("logs")]
public class LogEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [Column("message", TypeName = "text")]
    public string Message { get; set; } = null!;

    [Required]
    [Column("message_template", TypeName = "text")]
    public string MessageTemplate { get; set; } = null!;

    [Required]
    [Column("level")]
    public int Level { get; set; }

    [Required]
    [Column("timestamp", TypeName = "timestamp without time zone")]
    public DateTime Timestamp { get; set; }

    [Column("exception", TypeName = "text")]
    public string? Exception { get; set; }

    [Required]
    [Column("log_event", TypeName = "jsonb")]
    public JsonDocument LogEvent { get; set; } = null!;
}

package questionsgenerator;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class Generator {
	
	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	private Long id;

	private Question type_question;
	
	public Generator(String t_question){
		switch (t_question) {
		case "musician":
			type_question = new MusicianQuestion();
			break;
		case "actor":
			type_question = new ActorQuestion();
			break;
		// Can add some types of question here which implements Question
			
		default:
			type_question = new ActorQuestion();
			break;
		}
	}
	
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
}

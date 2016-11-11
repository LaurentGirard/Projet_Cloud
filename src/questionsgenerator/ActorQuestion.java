package questionsgenerator;

public class ActorQuestion extends Question{
	
	public ActorQuestion(){
		request = 	"prefix db-owl: <http://dbpedia.org/ontology/>"
					+"prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
					+ "PREFIX foaf: <http://xmlns.com/foaf/0.1/>"
					+ "select distinct * where {"
					+ "?actor a db-owl:Actor ;"
					+ "foaf:name ?lastname;"
					+ "db-owl:nationality ?nationality;"
					+ "db-owl:birthYear ?birthYear;"
					+ "db-owl:wikiPageID ?wiki."
					+ "}"
					+ "limit 10";
	}
}

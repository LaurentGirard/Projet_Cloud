package questionsgenerator;

import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.ResultSet;

public abstract class Question {
	protected String request;
		
	public ResultSet doRequest(){
		QueryExecution qexec = QueryExecutionFactory.sparqlService("http://dbpedia.org/sparql", request);
		return qexec.execSelect();
	}
}


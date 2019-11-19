import Register from './components/Registration/Register';
import AddChild from './components/AddChildToParent/AddChildForm';

function App() {
								<Route exact path="/register">
									<Register/>
								</Route>
						<Route exact path="/createchild">
						<AddChild />
						</Route>
}




export default App;

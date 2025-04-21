import { Switch, Route, RouteComponentProps } from "wouter";
import Layout from "@/components/layout/layout";
import Home from "@/pages/home";
import Article from "@/pages/article";
import Category from "@/pages/category";
import Tools from "@/pages/tools";
import Search from "@/pages/search";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";
import { ThemeProvider, CategoryProvider } from "@/lib/context";

// Wrapper component to handle passing toolSlug from route params
const ToolsWrapper = (props: RouteComponentProps<{ slug?: string }>) => {
  // Pass the slug parameter from the route to the Tools component
  return <Tools toolSlug={props.params.slug} />;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/article/:slug" component={Article} />
      <Route path="/category/:slug" component={Category} />
      <Route path="/tools" component={Tools} />
      <Route path="/tools/:slug" component={ToolsWrapper} />
      <Route path="/search" component={Search} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Directly wrap our Layout in ThemeProvider and CategoryProvider
  return (
    <ThemeProvider>
      <CategoryProvider>
        <Layout>
          <Router />
        </Layout>
      </CategoryProvider>
    </ThemeProvider>
  );
}

export default App;

import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-neutral-50 py-12 px-4">
      <div className="text-center">
        <div className="text-primary-500 text-6xl mb-4">
          <FiAlertCircle className="inline-block" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-neutral-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

import BirthdateForm from '../BirthdateForm';

export default function BirthdateFormExample() {
  return (
    <div className="max-w-md mx-auto">
      <BirthdateForm
        onSubmit={(date) => console.log('Birthdate submitted:', date)}
      />
    </div>
  );
}

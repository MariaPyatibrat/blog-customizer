import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
									  currentState,
									  onApply,
									  onReset,
								  }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const panelRef = useRef<HTMLDivElement>(null);

	const togglePanel = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				panelRef.current &&
				!panelRef.current.contains(event.target as Node) &&
				isOpen
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleFontFamilyChange = (selected: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: selected });
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setFormState({ ...formState, fontSizeOption: selected });
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormState({ ...formState, fontColor: selected });
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setFormState({ ...formState, backgroundColor: selected });
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setFormState({ ...formState, contentWidth: selected });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
		setIsOpen(false);
	};

	return (
		<>
			{/* Кнопка-стрелка для управления панелью */}
			<ArrowButton isOpen={isOpen} onClick={togglePanel} />

			{/* Панель настроек */}
			<aside
				ref={panelRef}
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
			>
				{/* Форма настроек */}
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
				>
					{/* Заголовок формы */}
					<Text as="h2" size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* Поле выбора шрифта */}
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title="Шрифт"
						onChange={handleFontFamilyChange}
					/>

					{/* Группа радиокнопок для размера шрифта */}
					<RadioGroup
						name="fontSize"
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title="Размер шрифта"
						onChange={handleFontSizeChange}
					/>

					{/* Поле выбора цвета текста */}
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title="Цвет шрифта"
						onChange={handleFontColorChange}
					/>

					{/* Разделительная линия */}
					<Separator />

					{/* Поле выбора цвета фона */}
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title="Цвет фона"
						onChange={handleBackgroundColorChange}
					/>

					{/* Поле выбора ширины контента */}
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title="Ширина контента"
						onChange={handleContentWidthChange}
					/>

					{/* Контейнер с кнопками действий */}
					<div className={styles.bottomContainer}>
						<Button title="Сбросить" htmlType="reset" type="clear" />
						<Button title="Применить" htmlType="submit" type="apply" />
					</div>
				</form>
			</aside>
		</>
	);
};